export class Contact {
  fullName: string | null
  emailAddress: string | null
  phoneNumber: string | null

  constructor(
    fullName: string | null,
    emailAddress: string | null,
    phoneNumber: string | null,
  ) {
    this.fullName = fullName
    this.emailAddress = emailAddress
    this.phoneNumber = phoneNumber
  }
}
