---
description: Mandatory GCP Account & Project Context for jpaquay.github.io
---
# GCP Context & Configuration Rule (jpaquay.github.io)

This directory is strictly bound to the following central `gcloud` configuration:

- **Named Configuration (`CLOUDSDK_ACTIVE_CONFIG_NAME`)**: `netdev-firebase`
- **GCP Project (`CLOUDSDK_CORE_PROJECT`)**: `netdev-firebase`
- **Authenticated Account (`CLOUDSDK_CORE_ACCOUNT`)**: `jerome@netdev.be`
- **Default Region / Zone**: `europe-west1` / `europe-west1-b`
- **Domain / Organization**: Netdev.be

## Mandatory Agent Instructions
1. **Never mutate global configurations**: Do NOT run `gcloud config set project ...` or `gcloud config set account ...`. Doing so corrupts named configurations across terminals.
2. **Use per-folder context**: Before running any `gcloud`, `bq`, `gsutil`, `terraform`, or `firebase` commands in this directory, either:
   - Source `.agents/gcloud.env` (`source .agents/gcloud.env`), OR
   - Pass `--configuration=netdev-firebase` / `--project=netdev-firebase` explicitly.
3. **Central Registry**: All workstation configurations are governed centrally at `~/.config/gcloud/gcp-registry.json`.
