const bcrypt = require('bcrypt')

describe('bcrypt 加密驗證', () => {
  const myPassword = 'test-password'
  const wrongPassword = 'test-password-a'
  const hash = bcrypt.hashSync(myPassword, 10)

  test('相同密碼應符合', () => {
    expect(bcrypt.compareSync(myPassword, hash)).toBeTruthy()
  })

  test('錯誤密碼應報錯', () => {
    expect(bcrypt.compareSync(wrongPassword, hash)).toBeFalsy()
  })
})
