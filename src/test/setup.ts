import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended"

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(),
}))

export type Context = {
  prisma: PrismaClient
}

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = mockDeep<PrismaClient>()
;(PrismaClient as jest.Mock).mockReturnValue(prismaMock)

