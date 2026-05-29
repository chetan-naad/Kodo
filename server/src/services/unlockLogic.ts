import { prisma } from '@kodo/db';

export async function getUnitStatuses(userId: string, unitIds: string[]): Promise<Record<string, string>> {
    if (unitIds.length === 0) return {};

    const progresses = await prisma.unitProgress.findMany({
        where: {
            userId,
            unitId: { in: unitIds }
        }
    });

    const statusMap: Record<string, string> = {};
    for (const p of progresses) {
        statusMap[p.unitId] = p.status;
    }

    const allUnits = await prisma.unit.findMany({
        where: { id: { in: unitIds } },
        include: { stage: true },
        orderBy: [{ stage: { order: 'asc' } }, { order: 'asc' }]
    });

    for (const unit of allUnits) {
        if (!statusMap[unit.id]) {
            if (unit.stage.order === 1 && unit.order === 1) {
                statusMap[unit.id] = 'unlocked';
            } else {
                statusMap[unit.id] = 'locked';
            }
        }
    }

    return statusMap;
}

export async function evaluateUnlockLogic(userId: string, currentUnitId: string) {
    await prisma.unitProgress.upsert({
        where: { userId_unitId: { userId, unitId: currentUnitId } },
        update: { status: 'completed' },
        create: { userId, unitId: currentUnitId, status: 'completed' }
    });

    const currentUnit = await prisma.unit.findUnique({ where: { id: currentUnitId }, include: { stage: true } });
    if (!currentUnit) return;

    const nextUnit = await prisma.unit.findFirst({
        where: { stageId: currentUnit.stageId, order: { gt: currentUnit.order }, published: true },
        orderBy: { order: 'asc' }
    });

    if (nextUnit) {
        await prisma.unitProgress.upsert({
            where: { userId_unitId: { userId, unitId: nextUnit.id } },
            update: { status: 'unlocked' },
            create: { userId, unitId: nextUnit.id, status: 'unlocked' }
        });
    } else {
        const nextStage = await prisma.stage.findFirst({
            where: { order: { gt: currentUnit.stage.order }, published: true },
            orderBy: { order: 'asc' }
        });
        if (nextStage) {
            const firstUnitOfNextStage = await prisma.unit.findFirst({
                where: { stageId: nextStage.id, published: true },
                orderBy: { order: 'asc' }
            });
            if (firstUnitOfNextStage) {
                await prisma.unitProgress.upsert({
                    where: { userId_unitId: { userId, unitId: firstUnitOfNextStage.id } },
                    update: { status: 'unlocked' },
                    create: { userId, unitId: firstUnitOfNextStage.id, status: 'unlocked' }
                });
            }
        }
    }
}
