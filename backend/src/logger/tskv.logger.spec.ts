import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let log;
  const tskvLogger = new TskvLogger();

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    log.mockReset();
  });

  it('должен выводиться корректный форат сообщения логгера', () => {
    tskvLogger.warn('Warn Message', { option_1: 'option_1', option_2: 2 });

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(
      'level=warn\tmessage=Warn Message\toptional=[{"option_1":"option_1","option_2":2}]',
    );
  });
});
