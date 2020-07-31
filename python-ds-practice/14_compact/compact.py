def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    # for thing in lst:
    #     if not thing:
    #         lst.remove(thing)
    
    return [val for val in lst if val]