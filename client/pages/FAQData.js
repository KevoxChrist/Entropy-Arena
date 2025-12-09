export const moduleInfo = {
  id: 'faq-item',
  title: 'Frequently Asked Questions',
  subtitle: 'Frequently Asked Questions',
}

export const faqItems = [
  {
    id: 'passwords',
    title: 'Where is our passwords from Arena going?',
    moduleTitle: moduleInfo.title,
    shortDescription: [
      'Passwords in the Arena are not saved. They are processed in the browser.',
    ]
  },
  {
    id: 'AIpasswords',
    title: 'is AI receiving our passwords? ',
    moduleTitle: moduleInfo.title,
    shortDescription:
      'No, we use algorithms built from our AI prompt engineer.',
  },
  {
    id: 'dictionary',
    title: 'What is a Dictionary Attack?',
    moduleTitle: moduleInfo.title,
    shortDescription:
      `A dictionary attack is a type of cybersecurity attack that uses a list of common words and phrases to guess a user's password for a system.`,
  },
  {
    id: 'bruteforce',
    title: `What is a Brute Force Attack?`,
    moduleTitle: moduleInfo.title,
    shortDescription:
      'A brute force attack is a cyberattack where attackers systematically try every possible combination of passwords or encryption keys to gain unauthorized access to a system, account, or data.',
  },
  {
    id: 'shannonEntropy',
    title: 'What is Shannon Entropy?',
    moduleTitle: moduleInfo.title,
    shortDescription: [
      `Shannon entropy is the measurement of how predictable something is.
      For passwords, it means how predictable your password is.
      An example would be: aaaaaaaa, having low entropy. 
      While: a1$(02A, would have high entropy.
      That's why it is important to use symbols, different chars, and numbers in password creation!`,
    ]
  },
  {
    id: 'cryptography',
    title: 'Cryptography',
    moduleTitle: moduleInfo.title,
    shortDescription: [ 
      'Cryptography is the practice of protecting information through the use of coded algorithms, hashes, and signatures. ',
      'Cryptography is an essential part of cybersecurity, especially for passwords.',
      '',
    ]
  },
  {
    id: 'good-password',
    title: 'What makes a good password?',
    moduleTitle: moduleInfo.title,
    shortDescription:
      'A good password consists of more than 12 characters, with a mix of symbols, numbers, and upper & lowercase letters.',
  },
  
]

export const getFaqItemById = (faqId) =>
  faqItems.find((item) => item.id === faqId)