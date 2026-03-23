import { useState, useRef } from 'react';
import { analyzeMedia } from '../lib/gemini';
import { Upload, Loader2, ScanFace, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MediaScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('目前僅支援圖片格式 (JPEG, PNG, WebP) 的 Deepfake 分析。');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];
      const res = await analyzeMedia(base64Data, mimeType);
      setResult(res);
    } catch (err: any) {
      console.error("Media analysis error:", err);
      setError(`分析失敗: ${err.message || '請稍後再試'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSampleImage = async (type: 'real' | 'fake') => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      // 使用一張比較生活化、非棚拍的真實照片，減少 AI 誤判為生成的機率
      const targetUrl = type === 'real' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' 
        : 'https://thispersondoesnotexist.com/';
      
      // Unsplash 支援直接跨域請求 (CORS)，其他網站使用 allorigins 代理
      const fetchUrl = type === 'real' 
        ? targetUrl 
        : `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
        
      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error('Failed to fetch sample image');
      
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      setError('無法載入測試圖片，請手動上傳。');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100">媒體檔案掃描 (Media Scanner)</h2>
        <p className="text-zinc-400 mt-1">上傳可疑的圖片，系統將分析是否有 Deepfake 或數位竄改痕跡。</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          onClick={() => loadSampleImage('fake')}
          className="px-3 py-1.5 text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md hover:bg-rose-500/20 transition-colors"
        >
          載入測試資料: AI 生成人臉 (ThisPersonDoesNotExist)
        </button>
        <button 
          onClick={() => loadSampleImage('real')}
          className="px-3 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md hover:bg-emerald-500/20 transition-colors"
        >
          載入測試資料: 真實人臉 (Unsplash)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-pointer min-h-[300px]"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="Preview" className="max-h-[400px] object-contain rounded-lg" />
            ) : (
              <>
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-zinc-400" />
                </div>
                <p className="text-zinc-300 font-medium">點擊或拖曳上傳圖片</p>
                <p className="text-zinc-500 text-sm mt-2">支援 JPEG, PNG, WebP (最大 10MB)</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          {image && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ScanFace className="w-5 h-5" />}
              {isAnalyzing ? '正在進行深度鑑識分析...' : '開始 Deepfake 分析'}
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
              <p className="animate-pulse">正在提取特徵向量與光影分析...</p>
            </div>
          ) : result ? (
            <div className="prose prose-invert prose-indigo max-w-none overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-zinc-600">
              尚未上傳並分析任何媒體檔案。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
