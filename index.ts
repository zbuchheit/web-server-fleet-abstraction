import * as resources from "@pulumi/azure-native/resources";
import * as network from "@pulumi/azure-native/network";
import {WebServerFleet} from "./shared/WebServerFleet";
import { ServerOperatingSystem, ServerSize } from "./shared/enums";

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

new WebServerFleet("webserver-fleet", {
    machines: [
        {count: 1, os: ServerOperatingSystem.ubuntu, size: ServerSize.small},
        {count: 2, os: ServerOperatingSystem.centOs, size: ServerSize.medium},
        {count: 1, os: ServerOperatingSystem.redHat, size: ServerSize.medium},
    ],
    resourceGroupName: resourceGroup.name,
    subnets: [
        subnet.id
    ]
})