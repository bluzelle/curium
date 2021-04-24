export const enum ClientErrors  {
    KEY_MUST_BE_A_STRING = 'Key must be a string',
    NEW_KEY_MUST_BE_A_STRING = 'New key must be a string',
    VALUE_MUST_BE_A_STRING = 'Value must be a string',
    ALL_KEYS_MUST_BE_STRINGS = "All keys must be strings",
    ALL_VALUES_MUST_BE_STRINGS = "All values must be strings",
    INVALID_LEASE_TIME = 'Invalid lease time',
    INVALID_VALUE_SPECIFIED = "Invalid value specified",
    ADDRESS_MUST_BE_A_STRING = "address must be a string",
    MNEMONIC_MUST_BE_A_STRING = "mnemonic must be a string",
    UUID_MUST_BE_A_STRING = 'uuid must be a string',
    INVALID_TRANSACTION = 'Invalid transaction.',
    KEY_CANNOT_CONTAIN_SLASH = 'Key cannot contain a slash',
    KEY_CANNOT_BE_EMPTY = 'Key cannot be empty'
}