def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    counted_chars = {}
    for i in phrase: 
        if i in counted_chars: 
            counted_chars[i] += 1
        else: 
            counted_chars[i] = 1
    return counted_chars