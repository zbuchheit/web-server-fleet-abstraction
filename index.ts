import * as resources from "@pulumi/azure-native/resources";
import * as network from "@pulumi/azure-native/network";
import * as compute from "@pulumi/azure-native/compute";
import {WebServerFleet} from "./shared/WebServerFleet";
import { ServerOperatingSystem, ServerSizeTypes } from "./shared/enums";
import { getResourceGroupOutput } from "@pulumi/azure-native/resources/getResourceGroup";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("resourceGroup");

const virtualNetwork = new network.VirtualNetwork("network", {
    resourceGroupName: resourceGroup.name,
    addressSpace: {
        addressPrefixes: ["10.0.0.0/16"],
    },
});

const subnet = new network.Subnet("subnet", {
    resourceGroupName: resourceGroup.name,
    virtualNetworkName: virtualNetwork.name,
    addressPrefix: "10.0.1.0/24",
});

const webServerFleet = new WebServerFleet("webserver-fleet", {
    machines: [
        {count: 1, os: ServerOperatingSystem.ubuntu, size: ServerSizeTypes.small},
        {count: 2, os: ServerOperatingSystem.centOs, size: ServerSizeTypes.medium},
        {count: 1, os: ServerOperatingSystem.redHat, size: ServerSizeTypes.medium},
    ],
    resourceGroupName: resourceGroup.name,
    subnets: [
        subnet.id
    ]
})