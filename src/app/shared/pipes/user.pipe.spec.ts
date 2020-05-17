import { UserPipe } from './user.pipe';

describe('UseuserPipe', () => {
  it('create an instance', () => {
    const pipe = new UserPipe();
    expect(pipe).toBeTruthy();
  });
});
