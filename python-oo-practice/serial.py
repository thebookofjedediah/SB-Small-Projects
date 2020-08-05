"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start=0):
        """
        Initialize generator
        """
        self.start = self.next = start

    def __repr__(self):
        """
        Human readable representation of the generator
        """
        return f"<SerialGenerator start={self.start} next={self.next}>"

    def generate(self):
        """
        Return the next serial number
        """
        self.next += 1
        return self.next - 1
    
    def reset(self):
        """
        Reset to original number
        """
        self.next = self.start
