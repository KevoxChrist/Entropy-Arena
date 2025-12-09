const InfoModalContent = {
    strengthLevel: {
        title: 'Strength Level',
        content: (
            <>
                <p>The <strong>Strength Level</strong> measures how resistant your password is to various cracking attempts.</p>
                <p>Password strength is rated on a scale from <strong>Very Weak</strong> to <strong>Centuries</strong>, based on factors like:</p>
                <ul>
                    <li>Length and complexity</li>
                    <li>Use of special characters, numbers, and mixed case</li>
                    <li>Avoidance of common patterns and dictionary words</li>
                </ul>
                <p>A stronger password means it would take attackers significantly longer to crack it using automated tools.</p>
            </>
        )
    },
    entropyScore: {
        title: 'Entropy Score',
        content: (
            <>
                <p>The <strong>Entropy Score</strong> measures the randomness and unpredictability of your password.</p>
                <p>Higher entropy means more possible combinations an attacker would need to try. The score is calculated using logarithmic scale (log10) of the number of guesses required.</p>
                <p><strong>Score ranges:</strong></p>
                <ul>
                    <li>0-20: Very predictable</li>
                    <li>20-40: Weak randomness</li>
                    <li>40-60: Moderate entropy</li>
                    <li>60-80: Good randomness</li>
                    <li>80+: Excellent entropy</li>
                </ul>
            </>
        )
    },
    dictionaryAttack: {
        title: 'Dictionary Attack',
        content: (
            <>
                <p>A <strong>Dictionary Attack</strong> uses a precompiled list of common passwords, words, and phrases to attempt to crack your password.</p>
                <p>This method is extremely fast because it leverages common patterns and frequently-used passwords. Attackers can try billions of combinations per second using specialized hardware.</p>
                <p><strong>How to defend:</strong></p>
                <ul>
                    <li>Avoid common words and phrases</li>
                    <li>Don't use personal information</li>
                    <li>Mix characters, numbers, and symbols</li>
                    <li>Use passphrases with uncommon word combinations</li>
                </ul>
                <p>The time shown represents how long it would take using fast hashing with 10 billion attempts per second.</p>
            </>
        )
    },
    bruteForceAttack: {
        title: 'Brute Force Attack',
        content: (
            <>
                <p>A <strong>Brute Force Attack</strong> systematically tries every possible combination of characters until the correct password is found.</p>
                <p>Unlike dictionary attacks, brute force doesn't rely on patterns or common words—it tries everything. However, with modern encryption and slow hashing algorithms, this becomes extremely time-consuming.</p>
                <p><strong>Defense mechanisms:</strong></p>
                <ul>
                    <li>Longer passwords exponentially increase cracking time</li>
                    <li>Slow hashing algorithms (bcrypt, scrypt) add computational cost</li>
                    <li>Each additional character dramatically increases security</li>
                </ul>
                <p>The time shown uses a slow hashing rate of 10,000 attempts per second, representing well-protected systems.</p>
            </>
        )
    },
    aiFeedback: {
        title: 'AI Feedback',
        content: (
            <>
                <p>Our <strong>AI Feedback</strong> system analyzes your password creation performance and provides personalized insights.</p>
                <p>The analysis considers multiple factors:</p>
                <ul>
                    <li><strong>Accuracy:</strong> How precisely you typed your password</li>
                    <li><strong>Speed:</strong> Your words-per-minute typing rate</li>
                    <li><strong>Entropy:</strong> The randomness of your password choices</li>
                    <li><strong>Length:</strong> Character count and complexity</li>
                </ul>
                <p>Use this feedback to improve your password creation skills and develop stronger security habits.</p>
            </>
        )
    },
    leetSpeakAttack: {
        title: 'L33t Speak Attack',
        content: (
            <>
                <p>A <strong>L33t Speak Attack</strong> (also known as "1337 speak") targets passwords that use common character substitutions like replacing letters with numbers or symbols.</p>
                <p>This attack method uses modified dictionaries that include common substitutions:</p>
                <ul>
                    <li>a → @ or 4</li>
                    <li>e → 3</li>
                    <li>i → 1 or !</li>
                    <li>o → 0</li>
                    <li>s → $ or 5</li>
                    <li>t → 7</li>
                </ul>
                <p><strong>Why it's effective:</strong></p>
                <ul>
                    <li>Many users think "P@ssw0rd" is secure when it's easily crackable</li>
                    <li>Substitution patterns are well-known and predictable</li>
                    <li>Automated tools can quickly try all common variations</li>
                </ul>
                <p>The time shown represents online attacks with rate limiting (100 attempts per hour), simulating real-world web service constraints.</p>
            </>
        )
    },
    sequentialAttacks: {
        title: 'Sequential Attacks',
        content: (
            <>
                <p><strong>Sequential Attacks</strong> involve running multiple attack methods one after another in a coordinated strategy to crack a password.</p>
                <p>Attackers typically follow this sequence:</p>
                <ul>
                    <li><strong>Step 1:</strong> Dictionary attack with common passwords</li>
                    <li><strong>Step 2:</strong> L33t speak variations of dictionary words</li>
                    <li><strong>Step 3:</strong> Common patterns (e.g., "Password123!")</li>
                    <li><strong>Step 4:</strong> Hybrid attacks combining words with numbers</li>
                    <li><strong>Step 5:</strong> Brute force if all else fails</li>
                </ul>
                <p><strong>Why this is dangerous:</strong></p>
                <ul>
                    <li>Most passwords fall to early steps in the sequence</li>
                    <li>Attackers optimize for "low-hanging fruit" first</li>
                    <li>Automated tools can chain attacks seamlessly</li>
                    <li>Each successful crack provides patterns for future attacks</li>
                </ul>
                <p>The time shown represents online attacks without throttling (10 attempts per second), simulating compromised or poorly protected systems.</p>
            </>
        )
    }
};

export default InfoModalContent;
