FROM mcr.microsoft.com/dotnet/core/sdk:3.1

RUN apt update
RUN apt install net-tools

RUN git clone https://github.com/BardinPetr/bluzelle-csharp
WORKDIR bluzelle-csharp/TestAPI
RUN dotnet build
WORKDIR bin/Debug/netcoreapp3.1
ENTRYPOINT ./TestAPI
