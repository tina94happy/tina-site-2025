export const k8sData = {
  nodes: [
    { id: "kubectl", label: "kubectl", type: "actor", x: 500, y: 50 },
    { id: "cp", label: "控制平面（Control Plane）", type: "group", x: 60, y: 120, w: 450, h: 420 },
    { id: "apiserver", label: "API Server", type: "box", x: 270, y: 280 },
    { id: "controller", label: "Controller Manager", type: "box", x: 270, y: 400 },
    { id: "scheduler", label: "Scheduler", type: "box", x: 270, y: 470 },
    { id: "etcd", label: "etcd", type: "storage", x: 400, y: 400 },
    { id: "internet", label: "Internet", type: "cloud", x: 900, y: 50 },
    { id: "firewall", label: "Firewall / Load Balancer", type: "box", x: 900, y: 160 },
    { id: "ingress", label: "Ingress Controller/Service", type: "box", x: 900, y: 240 },
    { id: "node1", label: "Worker Node 1", type: "group", x: 600, y: 240, w: 450, h: 220 },
    { id: "kubelet1", label: "kubelet", type: "chip", x: 700, y: 280 },
    { id: "proxy1", label: "kube-proxy", type: "chip", x: 850, y: 320 },
    { id: "runtime1", label: "container runtime", type: "chip", x: 700, y: 360 },
    { id: "pod1", label: "Pod", type: "pod", x: 850, y: 400 },
    { id: "node2", label: "Worker Node 2", type: "group", x: 600, y: 480, w: 450, h: 220 },
    { id: "kubelet2", label: "kubelet", type: "chip", x: 700, y: 540 },
    { id: "proxy2", label: "kube-proxy", type: "chip", x: 980, y: 560 },
    { id: "runtime2", label: "container runtime", type: "chip", x: 700, y: 620 },
    { id: "pod2", label: "Pod", type: "pod", x: 980, y: 630 },
  ],
  edges: [
    // 控制流程 (藍色) - 雙向箭頭表示 watch/回報
    { from: "kubectl", to: "apiserver", kind: "control" },
    { from: "apiserver", to: "kubelet1", kind: "control", bidirectional: true },
    { from: "apiserver", to: "kubelet2", kind: "control", bidirectional: true },
    { from: "kubelet1", to: "runtime1", kind: "control" },
    { from: "kubelet2", to: "runtime2", kind: "control" },
    { from: "runtime1", to: "pod1", kind: "control" },
    { from: "runtime2", to: "pod2", kind: "control" },
    
    // 狀態同步流程 (橙色) - 所有控制迴圈都經由 API Server
    { from: "apiserver", to: "etcd", kind: "sync", bidirectional: true },
    { from: "controller", to: "apiserver", kind: "sync", bidirectional: true },
    { from: "scheduler", to: "apiserver", kind: "sync", bidirectional: true },
    
    // 外部存取流程 (綠色) - 正確的流量路徑
    { from: "internet", to: "firewall", kind: "traffic" },
    { from: "firewall", to: "ingress", kind: "traffic" },
    { from: "ingress", to: "proxy1", kind: "traffic" },
    { from: "ingress", to: "proxy2", kind: "traffic" },
    { from: "proxy1", to: "pod1", kind: "traffic" },
    { from: "proxy2", to: "pod2", kind: "traffic" },
    
    // 服務發現
    { from: "coredns", to: "ingress", kind: "traffic" },
  ],
}

export const flows = {
  external: {
    name: "外部存取流程",
    description: "外部流量通過防火牆/負載均衡器進入叢集，由 Ingress Controller/Service 進行 L7/L4 路由，kube-proxy 負責 L4 轉發，最終到達目標 Pod。",
    color: "#10b981",
    steps: [
      { edges: ["internet-firewall"], nodes: ["internet", "firewall"] },
      { edges: ["firewall-ingress"], nodes: ["firewall", "ingress"] },
      { edges: ["ingress-proxy1", "ingress-proxy2"], nodes: ["ingress", "proxy1", "proxy2"] },
      { edges: ["proxy1-pod1", "proxy2-pod2"], nodes: ["proxy1", "proxy2", "pod1", "pod2"] },
    ],
  },
  control: {
    name: "控制流程",
    description: "用戶通過 kubectl 發送命令到 API Server，kubelet 主動 watch API Server 狀態變化並回報節點狀態，形成雙向通信。",
    color: "#3b82f6",
    steps: [
      { edges: ["kubectl-apiserver"], nodes: ["kubectl", "apiserver"] },
      { edges: ["apiserver-kubelet1", "apiserver-kubelet2"], nodes: ["apiserver", "kubelet1", "kubelet2"] },
      { edges: ["kubelet1-runtime1", "kubelet2-runtime2"], nodes: ["kubelet1", "kubelet2", "runtime1", "runtime2"] },
      { edges: ["runtime1-pod1", "runtime2-pod2"], nodes: ["runtime1", "runtime2", "pod1", "pod2"] },
    ],
  },
  sync: {
    name: "狀態同步流程",
    description: "所有控制迴圈都經由 API Server：Controller Manager 和 Scheduler 主動 watch API Server 狀態，API Server 與 etcd 雙向同步叢集狀態。",
    color: "#f59e0b",
    steps: [
      { edges: ["apiserver-etcd"], nodes: ["apiserver", "etcd"] },
      { edges: ["controller-apiserver"], nodes: ["controller", "apiserver"] },
      { edges: ["scheduler-apiserver"], nodes: ["scheduler", "apiserver"] },
    ],
  },
}

export const tooltips: Record<string, string> = {
  kubectl: "用戶端 CLI，向 API Server 發送操作指令",
  apiserver: "叢集統一入口點，驗證請求並提供 REST API",
  controller: "控制迴路管理，持續比對期望與實際狀態",
  scheduler: "Pod 排程決策，根據資源與限制指派節點",
  etcd: "分散式鍵值儲存，保存叢集狀態",
  kubelet1: "節點代理程式，主動 watch API Server 並回報狀態",
  kubelet2: "節點代理程式，主動 watch API Server 並回報狀態",
  proxy1: "L4 網路代理，透過 iptables/IPVS 轉發流量",
  proxy2: "L4 網路代理，透過 iptables/IPVS 轉發流量",
  runtime1: "容器執行環境，運行容器實例",
  runtime2: "容器執行環境，運行容器實例",
  pod1: "Kubernetes 最小部署單位",
  pod2: "Kubernetes 最小部署單位",
  internet: "外部網路流量來源",
  firewall: "防火牆/負載均衡器，過濾與分發外部請求",
  ingress: "L7/L4 路由控制器，處理 HTTP/HTTPS 流量並提供服務抽象",
  coredns: "DNS 服務，實現服務發現與名稱解析",
}

export const componentDetails = {
  controlPlane: [
    { id: "kube-apiserver", name: "API Server", description: "叢集統一入口點" },
    { id: "etcd", name: "etcd", description: "分散式鍵值儲存" },
    { id: "controller-manager", name: "Controller Manager", description: "控制迴路管理" },
    { id: "scheduler", name: "Scheduler", description: "Pod 排程決策" },
  ],
  workerNode: [
    { id: "kubelet", name: "kubelet", description: "節點代理程式" },
    { id: "kube-proxy", name: "kube-proxy", description: "L4 網路代理" },
    { id: "container-runtime", name: "Container Runtime", description: "容器執行環境" },
  ],
  networking: [
    { id: "ingress-controller", name: "Ingress Controller/Service", description: "L7/L4 路由控制器與服務抽象" },
    { id: "coredns", name: "CoreDNS", description: "DNS 服務發現" },
  ],
}

export const aboutContent = {
  control: {
    title: "控制流程特點",
    content: "kubelet 主動 watch API Server 狀態變化，形成雙向通信。所有控制請求都通過 API Server，確保安全性和一致性。",
  },
  sync: {
    title: "數據同步機制",
    content: "所有控制迴圈都經由 API Server：Controller Manager 和 Scheduler 主動 watch API Server，API Server 與 etcd 雙向同步叢集狀態。",
  },
  network: {
    title: "網路流量管理",
    content: "外部流量通過 Ingress Controller/Service（L7/L4）路由，kube-proxy 負責 L4 轉發，支援 iptables、IPVS 等模式。",
  },
}
