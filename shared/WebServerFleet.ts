import { compute, network } from "@pulumi/azure-native";
import { ComponentResource, ComponentResourceOptions, Input } from "@pulumi/pulumi";
import { ServerOperatingSystem, ServerSize } from "./enums";

export class WebServerFleet extends ComponentResource {
    constructor(name: string, args: WebServerFleetArgs, opts?: ComponentResourceOptions) {
        super("zbchht:webServer:WebServerFleet", name, args, opts);

        args.machines.forEach((machine) => {
            for (let vmIndex = 0; vmIndex < machine.count; vmIndex++) {

                const nic = new network.NetworkInterface(`nic-${machine.os.offer}-${vmIndex}`, {
                    resourceGroupName: args.resourceGroupName,
                    ipConfigurations: [{
                        name: "webserveripcfg",
                        subnet: {
                            //Unclear so defaulting to first index subnet
                            id: args.subnets[0],
                        },
                        privateIPAllocationMethod: "Dynamic",
                    }],
                }, {
                    parent: this
                });

                // Create an Ubuntu Virtual Machine
                new compute.VirtualMachine(`vm-${machine.os.offer}-${vmIndex}`, {
                    resourceGroupName: args.resourceGroupName,
                    networkProfile: {
                        networkInterfaces: [{
                            id: nic.id,
                        }],
                    },
                    hardwareProfile: {
                        vmSize: machine.size.vmSize,
                    },
                    osProfile: {
                        computerName: "hostname",
                        adminUsername: "testadmin",
                        adminPassword: "Password1234!",
                        customData: Buffer.from(machine.os.startupScript).toString('base64')
                    },
                    storageProfile: {
                        imageReference: {
                            publisher: machine.os.publisher,
                            offer: machine.os.offer,
                            sku: machine.os.sku,
                            version: "latest",
                        },
                        osDisk: {
                            createOption: "FromImage",
                            diskSizeGB: machine.size.diskSizeGB,
                            deleteOption: "Delete"
                        },
                    }
                }, {
                    parent: this
                });
            }
        })
    }
}

export interface WebServerFleetArgs {
    resourceGroupName: Input<string>;
    subnets: Input<string>[];
    machines: ServerArgs[];
}
interface ServerArgs {
    os: ServerOperatingSystem;
    size: ServerSize;
    count: Input<number>;
}