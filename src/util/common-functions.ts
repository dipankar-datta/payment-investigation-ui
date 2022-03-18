export const parseDate = (dateString: string | undefined): string | undefined => {
    return dateString ? dateString.split("T")[0] : undefined;
}