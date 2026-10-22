#!/usr/bin/env bash

set -euo pipefail

while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployReact.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying React bundle $service to $hostname with $key\n"

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf dist
npm ci
npm run build

if [[ ! -f dist/index.html ]]; then
    printf "\nBuild did not produce dist/index.html.\n"
    exit 1
fi

# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf "/home/ubuntu/services/${service}/public"
mkdir -p "/home/ubuntu/services/${service}/public"
ENDSSH

# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" dist/. "ubuntu@$hostname:/home/ubuntu/services/$service/public/"

ssh -i "$key" ubuntu@$hostname << ENDSSH
test -f "/home/ubuntu/services/${service}/public/index.html"
ENDSSH

# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf dist