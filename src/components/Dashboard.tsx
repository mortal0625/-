import { Shield, Activity, Users, AlertOctagon, Info } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">系統總覽 (Overview)</h2>
          <p className="text-zinc-400 mt-1">TrueSight 邊緣與雲端混合防護系統狀態。</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium">
          <Info className="w-4 h-4" />
          展示用模擬數據 (Mock Data)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Shield className="w-6 h-6 text-emerald-500" />} title="防護狀態" value="安全 (Active)" trend="系統運作正常" />
        <StatCard icon={<AlertOctagon className="w-6 h-6 text-rose-500" />} title="今日阻擋威脅" value="1,204" trend="+12% 較昨日" />
        <StatCard icon={<Activity className="w-6 h-6 text-indigo-500" />} title="邊緣推論次數" value="45.2K" trend="節省 92% 雲端頻寬" />
        <StatCard icon={<Users className="w-6 h-6 text-blue-500" />} title="聯防節點數" value="8,432" trend="全球活躍設備" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4">近期威脅情報 (Recent Threats)</h3>
          <div className="space-y-4">
            {[
              { time: '10分鐘前', type: 'Deepfake 視訊', source: 'Line 通話', status: '已攔截' },
              { time: '1小時前', type: '釣魚簡訊', source: 'SMS', status: '已隔離' },
              { time: '3小時前', type: '惡意軟體下載', source: 'Chrome', status: '已封鎖' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{item.type}</p>
                    <p className="text-xs text-zinc-500">{item.source} · {item.time}</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4">系統資源使用率 (Edge Resources)</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">NPU 負載 (AI 推論)</span>
                <span className="text-zinc-200">24%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">記憶體使用量 (沙箱)</span>
                <span className="text-zinc-200">128 MB</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">電池消耗影響</span>
                <span className="text-zinc-200">&lt; 1% / hr</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string, trend: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
      </div>
      <div className="mt-auto">
        <p className="text-2xl font-bold text-zinc-100">{value}</p>
        <p className="text-xs text-zinc-500 mt-1">{trend}</p>
      </div>
    </div>
  );
}
