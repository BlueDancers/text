# linux格式化命令

在使用linux的时候经常看一些参数 但是没有格式化完全看不懂

![](http://on7r0tqgu.bkt.clouddn.com/FqioY_7jttiga4eVZzc199dX-bLN.png)

就像这样 但是python有一种格式化命令特标好用

**python -m json.tool**

```bash
[root@registry opt]# curl -X GET http://localhost:2375/containers/json | python -m json.tool
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1149  100  1149    0     0   7589      0 --:--:-- --:--:-- --:--:--  7559
[
    {
        "Command": "/entrypoint.sh /etc/docker/registry/config.yml",
        "Created": 1526867220,
        "HostConfig": {
            "NetworkMode": "default"
        },
        "Id": "7f32e05dca33a805399f1420ef8b716163cb58ef1ed0a727ae6c8362030ea94c",
        "Image": "registry",
        "ImageID": "sha256:c9bd19d022f6613fa0e3d73b2fe2b2cffe19ed629a426db9a652b597fccf07d4",
        "Labels": {},
        "Mounts": [
            {
                "Destination": "/var/lib/registry",
                "Driver": "local",
                "Mode": "",
                "Name": "1f1dc3207d53ee50342389d448428349812c3ae1a9628765509441c0c026c158",
                "Propagation": "",
                "RW": true,
                "Source": "/var/lib/docker/volumes/1f1dc3207d53ee50342389d448428349812c3ae1a9628765509441c0c026c158/_data"
            }
        ],
        "Names": [
            "/suspicious_tesla"
        ],
        "NetworkSettings": {
            "Networks": {
                "bridge": {
                    "Aliases": null,
                    "EndpointID": "beaa90243e62d27623a4e8b13758494ff8d61c37daa90db40e5071cd1b767e58",
                    "Gateway": "172.17.0.1",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "IPAMConfig": null,
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "Links": null,
                    "MacAddress": "02:42:ac:11:00:02",
                    "NetworkID": "7deca4d55b0dd604de239015805e0ae6c0a36c66fca1699f8788b4eba884f56d"
                }
            }
        },
        "Ports": [
            {
                "IP": "0.0.0.0",
                "PrivatePort": 5000,
                "PublicPort": 5000,
                "Type": "tcp"
            }
        ],
        "State": "running",
        "Status": "Up 3 hours"
    }
]
```

这样看起来很棒