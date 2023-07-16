interface ServerSizeType {
    vmSize: string;
    diskSizeGB: number;
}
export const ServerSize: { [key: string]: ServerSizeType } = {
    small: {
        vmSize: "Standard_A1",
        diskSizeGB: 100
    },
    medium: {
        vmSize: "Standard_A2",
        diskSizeGB: 150
    },
    large: {
        vmSize: "Standard_A3",
        diskSizeGB: 150
    },
    xlarge: {
        vmSize: "Standard_A4",
        diskSizeGB: 150
    }
} as const;
export type ServerSize = (typeof ServerSize)[keyof typeof ServerSize];

interface ServerOperatingSystemType {
    publisher: string;
    offer: string;
    sku: string;
    startupScript: string;
}
export const ServerOperatingSystem: { [key: string]: ServerOperatingSystemType } = {
    ubuntu: {
        publisher: "canonical",
        offer: "UbuntuServer",
        sku: "16.04-LTS",
        startupScript:
        `
        #cloud-config
        packages:
            - nginx
        runcmd:
            - systemctl enable nginx
            - systemctl start nginx
        `,
    },
    //TODO: Fix startup script
    centOs: {
        publisher: "OpenLogic",
        offer: "CentOS",
        sku: "7.7",
        startupScript: 
        `
        #cloud-config
        packages:
            - nginx
        runcmd:
            - systemctl enable nginx
            - systemctl start nginx
        `,
    },
    //TODO: Fix startup script
    redHat: {
        publisher: "RedHat",
        offer: "RHEL",
        sku: "8-LVM",
        startupScript: 
        `
        #cloud-config
        packages:
            - nginx
        runcmd:
            - systemctl enable nginx
            - systemctl start nginx
        `,
    }
} as const;
export type ServerOperatingSystem = (typeof ServerOperatingSystem)[keyof typeof ServerOperatingSystem];
