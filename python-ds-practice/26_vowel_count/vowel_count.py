def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    phrase = phrase.lower()
    vowels = "aeiou"
    counted_chars = {}
    for i in phrase: 
        if i in vowels:
            if i in counted_chars: 
                counted_chars[i] += 1
            else: 
                counted_chars[i] = 1
    return counted_chars