// Uncomment the code below and write your tests
import {getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.withdraw(1100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(1000);
    const bankAccount2 = getBankAccount(0);
    expect(() => bankAccount.transfer(1100, bankAccount2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.transfer(1100, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1000);
    bankAccount.deposit(100);
    expect(bankAccount.getBalance()).toBe(1100);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const moneyToWithdraw = 500;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(500);
    expect(bankAccount.getBalance()).toBe(initialBalance - moneyToWithdraw);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(1000);
    const bankAccount2 = getBankAccount(0);
    bankAccount.transfer(100, bankAccount2);
    expect(bankAccount.getBalance()).toBe(900);
    expect(bankAccount2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(1000);
    const lodash = jest.requireActual('lodash');
    lodash.random = jest.fn(() => 10);
    const res = await bankAccount.fetchBalance();
    expect(res).toBe(10);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(1000);
    const lodash = jest.requireActual('lodash');
    lodash.random = jest.fn(() => 10);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(1000);
    const lodash = jest.requireActual('lodash');
    lodash.random = jest.fn(() => null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
