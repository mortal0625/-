import { useState } from 'react';
import { analyzePhishing } from '../lib/gemini';
import { Link, Loader2, ShieldAlert } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PhishingChecker() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const res = await analyzePhishing(text);
      setResult(res);
    } catch (err: any) {
      console.error("Phishing analysis error:", err);
      setError(`分析失敗: ${err.message || '請稍後再試'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const samples = {
    fake: "【XX銀行】您的帳戶活動異常，請立即登入重新驗證您的身分，否則將於24小時內凍結帳戶：https://secure-update-bank-tw.com/login",
    real: "【XX銀行】您於 2023/10/27 10:00 使用信用卡末四碼 1234 消費新台幣 1,000 元。如有疑問請致電客服 0800-000-000。"
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100">釣魚連結與簡訊防護 (Phishing Shield)</h2>
        <p className="text-zinc-400 mt-1">貼上可疑的網址或簡訊內容，系統將結合 Google 搜尋進行查證與詐騙分析。</p>
      </div>

      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setText(samples.fake)}
          className="px-3 py-1.5 text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md hover:bg-rose-500/20 transition-colors"
        >
          載入測試資料: 假冒銀行簡訊 (惡意)
        </button>
        <button 
          onClick={() => setText(samples.real)}
          className="px-3 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md hover:bg-emerald-500/20 transition-colors"
        >
          載入測試資料: 真實銀行簡訊 (安全)
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="貼上可疑的網址 (URL) 或簡訊內容... (例如: 親愛的客戶，您的包裹已派發，請點擊連結確認...)"
          className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-zinc-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none custom-scrollbar"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link className="w-4 h-4" />}
            {isAnalyzing ? '查證中...' : '開始查證'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">查證報告</h3>
          <div className="prose prose-invert prose-indigo max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
