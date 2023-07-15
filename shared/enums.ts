export const ServerSizeTypes = {
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
export type ServerSizeTypes = (typeof ServerSizeTypes)[keyof typeof ServerSizeTypes];

export const ServerOperatingSystem = {
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
    //TODO: Fix startup
    centOs: {
        publisher: "OpenLogic",
        offer: "CentOS",
        sku: "7.7",
        startupScript: 
        `
        #cloud-config
        packages:
            - nginx
        write_files:
            - path: /etc/yum.repos.d/nginx.repo
                content: |
                    [nginx]
                    name=nginx repo
                    baseurl=http://nginx.org/packages/mainline/rhel/$releasever/$basearch/
                    gpgcheck=0
                    enabled=1
        runcmd:
            - yum -y install epel-release
            - systemctl enable nginx
            - systemctl start nginx
        `,
    },
    //TODO: Fix startup
    redHat: {
        publisher: "RedHat",
        offer: "RHEL",
        sku: "8-LVM",
        startupScript: 
        `
        #!/bin/bash
        yum -y install nginx
        systemctl enable nginx
        systemctl start nginx
        `,
    }
} as const;
export type ServerOperatingSystem = (typeof ServerOperatingSystem)[keyof typeof ServerOperatingSystem];
