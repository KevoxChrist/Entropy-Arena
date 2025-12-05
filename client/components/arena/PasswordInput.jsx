import zxcvbn from 'zxcvbn';

function PasswordInput({ value, onChange, placeholder = "Enter password", showRequirements = false, requirements = {} }) {
    const handleChange = (e) => {
        const newValue = e.target.value;

        if (newValue) {
            const result = zxcvbn(newValue);
            onChange(newValue, result);
        } else {
            onChange(newValue, null);
        }
    };

    const getStrengthLabel = (score) => {
        const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Centuries'];
        return labels[score];
    };

    const getStrengthColor = (score) => {
        const colors = ['#d73f40', '#dc6551', '#f2b84f', '#bde952', '#3ba62f'];
        return colors[score];
    };

    // Get strength from value if it exists
    const strength = value ? zxcvbn(value) : null;

    return (
        <div className="player-input">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
            {strength && (
                <div className="strength-indicator">
                    <span className="strength-label" style={{ color: getStrengthColor(strength.score) }}>
                        {getStrengthLabel(strength.score)}
                    </span>
                    {/* <span className="strength-score">+9</span> */}
                </div>
            )}
            {showRequirements && (
                <div className="password-requirements">
                    <span className={`requirement ${requirements.hasNumber ? 'active' : ''}`}>123</span>
                    <span className={`requirement ${requirements.hasSymbol ? 'active' : ''}`}>!@#$</span>
                    <span className={`requirement ${requirements.hasUppercase ? 'active' : ''}`}>↑ABC</span>
                    <span className={`requirement ${requirements.hasLowercase ? 'active' : ''}`}>↓abc</span>
                </div>
            )}
        </div>
    );
}

export default PasswordInput;
