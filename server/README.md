# OperatorHub.io Server
Express based stateless server providing static website resources and API layer with data.

Build with Typescript.

## Running
Install dependencies with `npm i`, build the server code `npm run build` and run the server `npm run server`.
Build outcome (transpiled files to JS) are present in `dist` folder.

Server process accepts set of arguments. In order to pass parameters to npm command use `npm run server -- [arguments]`

```
        --help, -h
                Displays help information about this script

        --port, -p [PORT env variable]
                Defines port where runs server http instance
                ... -p 8080 or --port=8080
                

        --secureport, -sp [SECUREPORT env variable]
                Defines port where runs server https instance
                ... -sp 8443 or --secureport=8443

        --registry, -r [REGISTRY env variable]
                Defines location of operators registry instance with port
                ... -r localhost:50051 or --registry=localhost:50051

        --log, -l [LOG_LEVEL env variable]
                Defines log level where 0=debug, 1=log, 2=warn and 3=error
                ... -l 2 or --log=2

        --version
                Displays version info
```

# Operator registry dependency
Please note that in order to run the server operator registry has to be exposed to the server so server can import data from it.

## How to run operator registry locally

1. Checkout operators-registry

``https://github.com/operator-framework/operator-registry.git``

2. Checkout community operators repo

``https://github.com/operator-framework/community-operators.git``

3. Copy upstream operators to registry example folder

4. Nest operators so registry can use them!

```
find . -mindepth 1 -maxdepth 1 -type d -exec echo "courier-operator -> {}" \; -exec operator-courier nest {} nested-structure/{} \;
```

5. Move operators from nested folder to parent folder

6. build registry

``docker build -t example-registry:latest -f upstream-example.Dockerfile .``

7. run registry image with name so we can connect it to envoy proxy

``docker run -p 50051:50051 --net=bridge --name registry  example-registry``
Note that on Linux --net=bridge might not work as there used to be bug in Docker so maybe host would be needed.


# Importer component

Connects to Operator registry image running by default on port **50051** and pulls all data required to build operators index for use with OperatorHub.io.

Built index can be reviewed in folder ./cache/operators.json as JSON file.

Utility is written in Typescript.

## Running 
Runs on server startup before Express JS.

## PROTO file update
Proto files are generated by maintainers, therefore when Operator Registry instance is updated and PROTO file get changed, new proto files has to be generated.

This could be automated, but PROTO file inside registry should be stable therefore its very rare occasion.

1. copy PROTO file from checked out operator registry
`[operator-registry]\pkg\api`
2. run generator `npm run gents`
3. run build `npm run build`
