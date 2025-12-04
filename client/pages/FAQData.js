export const moduleInfo = {
  id: 'faq-item',
  title: 'Frequently Asked Questions',
  subtitle: 'Frequently Asked Questions',
}

export const faqItems = [
  {
    id: 'entropy',
    title: 'Where is our passwords going?',
    moduleTitle: moduleInfo.title,
    shortDescription:
      'Passwords in the Arena are not saved!',
  },
  {
    id: 'passwords',
    title: 'Where is our passwords from Arena going?',
    moduleTitle: moduleInfo.title,
    shortDescription: [
      'Passwords in the Arena are not saved! They are processed in the browser!',
    ]
  },
  {
    id: 'AIpasswords',
    title: 'is AI receiving our passwords? ',
    moduleTitle: moduleInfo.title,
    shortDescription:
      'No! We use algorithms built from our AI prompt engineer.',
  },
  {
    id: 'entropy',
    title: 'What is Shannon Entropy?',
    moduleTitle: moduleInfo.title,
    shortDescription: [
      'Shannon entropy is the measurement of how predictable something is. ',
      'For passwords, it means how predictable your password is! ',
      'An example would be, aaaaaaaa, having low entropy. ',
      'While, a1$(02A, would have high entropy! ',
      'Thats why it is important to use symbols, different chars, and numbers in password creation!',
    ]
  },
  {
    id: 'cryptography',
    title: 'Cryptography',
    moduleTitle: moduleInfo.title,
    shortDescription: [ 
      'Cryptography is the practice of protecting information through the use of coded algorithms, hashes, and signatures. ',
      'Cryptography is an essential part of cybersecurity, especially for passwords!',
      '',
    ]
  },
  {
    id: 'good-password',
    title: 'What makes a good password?',
    moduleTitle: moduleInfo.title,
    shortDescription:
      'Design passwords that balance memorability with strength, and know when to lean on a password manager.',
  },

]

export const getFaqItemById = (faqId) =>
  faqItems.find((item) => item.id === faqId)
