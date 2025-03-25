import { DatabaseConnection } from '@infrastructure/persistence/database'

export const DatabaseConnectionStub = {
  isConnected: jest.fn()
} as unknown as jest.Mocked<DatabaseConnection>
