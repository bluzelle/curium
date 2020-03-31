[deploy additional](../setup/deployaddl.md) | [transactions](../commands/transactions.md)
***
Query CRUD Commands
======================

>The querying subcommands provide access to the unsigned functionaity of the 
Curium cli. These commands do not use gas and results are returned directly.

>The CLI can provide usage help for the queries with the following command:

    blzcli q --help


# CRUD Queries
***
## read        
>read UUID key

    blzcli q crud read <uuid> <key>

***
## has         
>has UUID key

     blzcli q crud has <uuid> <key>

***
## keys        
>keys UUID

    blzcli q crud keys <uuid>

***
## keyvalues   
>keyvalues UUID

    blzcli q crud keyvalues <uuid>

***
## count       
>count UUID

    blzcli q crud count <uuid>

***
## getlease
> given a uuid and key returns the lease time left for that data in terms of 
> number of blocks

    blzcli q crud getlease <uuid> <key>
***
## getnshortestlease 
> returns a list of N keys associated with UUID, with the shortest leases

    blzcli q crud getnshortestlease <uuid> <N>


***
[deploy additional](../setup/deployaddl.md) | [transactions](../commands/transactions.md)