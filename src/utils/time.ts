export const getDurationFromMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);

    return hours ? `${hours}h ${(minutes - (hours * 60))}min` : `${minutes}min`;
}