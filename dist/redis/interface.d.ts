export interface DebounceData {
    userTwitterId: string;
    objectName: string;
    triggerName: string;
    queryParams: Record<string, string>;
}
export type ExpiryHandler = (keyName: string) => void;
