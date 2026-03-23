import { useState, useRef } from 'react';
import { analyzeAudio } from '../lib/gemini';
import { Upload, Loader2, Mic, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AudioScanner() {
  const [audio, setAudio] = useState<{ url: string, base64: string, mimeType: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setError('目前僅支援音訊格式 (MP3, WAV, M4A) 的 Deepfake 分析。');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const resultStr = reader.result as string;
      const base64Data = resultStr.split(',')[1];
      const mimeType = resultStr.split(';')[0].split(':')[1];
      
      setAudio({
        url: URL.createObjectURL(file),
        base64: base64Data,
        mimeType: mimeType
      });
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!audio) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const res = await analyzeAudio(audio.base64, audio.mimeType);
      setResult(res);
    } catch (err: any) {
      console.error("Audio analysis error:", err);
      setError(`分析失敗: ${err.message || '請稍後再試'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100">語音深偽分析 (Audio Deepfake Scanner)</h2>
        <p className="text-zinc-400 mt-1">上傳可疑的語音留言或通話錄音，系統將分析是否為 AI 語音複製 (Voice Cloning)。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-pointer min-h-[200px]"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
              <Mic className="w-8 h-8 text-zinc-400" />
            </div>
            <p className="text-zinc-300 font-medium">點擊或拖曳上傳音檔</p>
            <p className="text-zinc-500 text-sm mt-2">支援 MP3, WAV, M4A (最大 10MB)</p>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="audio/*" 
              className="hidden" 
            />
          </div>

          {audio && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <audio controls src={audio.url} className="w-full" />
            </div>
          )}

          {audio && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
              {isAnalyzing ? '正在進行聲紋鑑識分析...' : '開始語音分析'}
            </button>
          )}

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full min-h-[400px]">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">鑑識報告</h3>
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-zinc-500 space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="animate-pulse">正在提取聲學特徵與頻譜分析...</p>
            </div>
          ) : result ? (
            <div className="prose prose-invert prose-indigo max-w-none overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-zinc-600">
              尚未上傳並分析任何音訊檔案。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
