def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    phrase_length = len(phrase)
    new_phrase = phrase[phrase_length::-1]
    stripped_phrase = phrase.replace(" ", "")
    stripped_new_phrase = new_phrase.replace(" ", "")
    if stripped_phrase.upper() == stripped_new_phrase.upper():
        return True
    else:
        return False