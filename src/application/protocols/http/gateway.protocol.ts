export interface Gateway<T> {
  execute(input?: any, name?: string): Promise<T>
}
