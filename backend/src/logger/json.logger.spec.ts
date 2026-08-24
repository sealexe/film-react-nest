import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let log;
  const jsonLogger = new JsonLogger();

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    log.mockReset();
  });

  it('должен выводиться корректный формат сообщения логгера', () => {
    jsonLogger.warn('Warn Message', { option_1: 'option_1', option_2: 2 });

    const expected = JSON.stringify({
      level: 'warn',
      message: 'Warn Message',
      optionalParams: [{ option_1: 'option_1', option_2: 2 }],
    });

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(expected);
  });
});
