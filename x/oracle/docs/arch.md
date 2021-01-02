# Description

The feeder and processor in the oracle runs as a Cosmos module that encompasses both functions.

### Feeder

A feeder is responsible to fetch the data from remote sources and send the resulting data to the processor

### Processor

A processor is responsible for combining and filtering votes to produce a single value that it writes to the DB.

# Oracle flow

### Feeders

* Feeders start and read their configuration from the CRUD module

* Feeders then request information from the sources provided in the configuration

* For each source a preflight vote proof is generated and put on the blockchain

  The preflight consists of the vote hashed with the address of the validator (to prevent free-riders). The preflight hash includes a signature, signed with the validator's consensus key.

* For each source at 20 seconds past the minute a vote is cast on the blockchain that matches the value in the preflight proof. Each vote includes with it a signature, signed with the validator's consensus key.

### Processors

* Listens for preflight proofs and votes on the blockchain
* When a vote is received it is compared with the preflight proof - if the proof does not match, the vote is discarded. If the signatures (of both the preflight proof and the vote itself) does not match the signer, the vote is discarded. 
* Votes are then compared and combined using a combination of weights and elimination rules.
* A single (blended) value is written to the DB for each source along with the votes and associated metadata that led to the single blended value.
