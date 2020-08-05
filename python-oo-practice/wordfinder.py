"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    """
    Wordfinder finds random works from a txt dictionary
    """

    def __init__(self, path):
        """
        Open the path and reports number of words
        """

        dict_file = open(path)
        self.words = self.parse(dict_file)
        print(f"{len(self.words)} words read")

    def parse(self, dict_file):
        """
        Check dict_file for list of words
        """

        return [w.strip() for w in dict_file]

    def random(self):
        """
        Return a random word
        """
        
        return random.choice(self.words)


class SpecialWordFinder(WordFinder):
    """
    Wordfinder with a twist
    """

    def parse(self, dict_file):
        """
        Patse list of words, skip blank lines
        """

        return [w.strip() for w in dict_file if w.strip() and not w.startswith("#")]