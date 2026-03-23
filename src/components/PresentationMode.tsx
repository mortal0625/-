import { useState } from 'react';
import { ChevronRight, ChevronLeft, Shield, Cpu, Lock, Zap, MessageSquareText, X } from 'lucide-react';
import { cn } from '../utils';

export default function PresentationMode() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const slides = [
    {
      title: "專案願景與痛點",
      subtitle: "為什麼我們需要 TrueSight？",
      icon: <Shield className="w-12 h-12 text-indigo-500" />,
      notes: "各位好，今天我要向大家介紹『TrueSight 真實之眼』。\n\n大家最近應該常看到 AI 換臉詐騙、或是假語音勒索的新聞。隨著生成式 AI 越來越強大，傳統的防毒軟體已經無法分辨這些『以假亂真』的內容。\n\n為了解決這個痛點，我們開發了 TrueSight。這是一款結合邊緣運算與雲端大型語言模型 (LLM) 的防護 App，目標是為一般使用者提供即時、低延遲，且高度保護隱私的 AI 詐騙防護網。",
      content: (
        <div className="space-y-6 text-zinc-300">
          <p className="text-xl leading-relaxed">
            <strong className="text-white">痛點：</strong> 隨著生成式 AI (GenAI) 的普及，Deepfake 詐騙、語音複製與釣魚攻擊的門檻大幅降低。傳統防毒軟體無法即時辨識這些「以假亂真」的內容。
          </p>
          <p className="text-xl leading-relaxed">
            <strong className="text-white">解決方案：</strong> TrueSight (真實之眼) 是一款專為一般消費者設計的 AI 防護 App。它結合了邊緣運算與雲端大型語言模型 (LLM)，提供即時、低延遲且高度保護隱私的深偽與惡意軟體偵測。
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h4 className="text-rose-400 font-bold mb-2">現狀威脅</h4>
              <ul className="list-disc list-inside space-y-2 text-zinc-400">
                <li>視訊換臉詐騙 (Line/Messenger)</li>
                <li>AI 語音複製勒索</li>
                <li>高擬真釣魚簡訊</li>
              </ul>
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h4 className="text-emerald-400 font-bold mb-2">TrueSight 防護</h4>
              <ul className="list-disc list-inside space-y-2 text-zinc-400">
                <li>即時視訊懸浮窗偵測</li>
                <li>多模態 (影像/語音) 鑑識</li>
                <li>LLM 語意與網域查證</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "核心架構：混合式推論",
      subtitle: "邊緣運算 (Edge) vs. 雲端推論 (Cloud)",
      icon: <Cpu className="w-12 h-12 text-emerald-500" />,
      notes: "在架構設計上，我們面臨了『延遲、隱私與運算成本』的三角難題。\n\n如果全靠雲端，會有網路延遲跟隱私外洩的風險；如果全靠手機邊緣運算，算力又不足以應付複雜的 AI 模型。\n\n因此我們採用了『混合式推論』架構。手機端負責 90% 的輕量級即時過濾，確保視訊通話不卡頓且隱私不出設備；只有遇到高風險或極度複雜的樣本時，才會去識別化後，送到雲端交給強大的 Gemini 模型進行深度鑑識。",
      content: (
        <div className="space-y-6 text-zinc-300">
          <p className="text-lg">
            我們採用了「混合架構 (Hybrid Architecture)」，在延遲性、隱私與成本之間取得最佳平衡。
          </p>
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="bg-zinc-900 font-semibold text-zinc-100 p-4 border-b border-zinc-800">評估維度</th>
                  <th className="bg-zinc-900 font-semibold text-emerald-400 p-4 border-b border-zinc-800">邊緣運算 (手機端)</th>
                  <th className="bg-zinc-900 font-semibold text-indigo-400 p-4 border-b border-zinc-800">雲端推論 (Gemini API)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-zinc-800/50 font-medium text-white">延遲性 (Latency)</td>
                  <td className="p-4 border-b border-zinc-800/50 text-emerald-300">毫秒級 (適合即時視訊)</td>
                  <td className="p-4 border-b border-zinc-800/50 text-zinc-400">依賴網路，有傳輸延遲</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-zinc-800/50 font-medium text-white">隱私保護 (Privacy)</td>
                  <td className="p-4 border-b border-zinc-800/50 text-emerald-300">資料不出設備 (高隱私)</td>
                  <td className="p-4 border-b border-zinc-800/50 text-zinc-400">需傳輸敏感資料</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-zinc-800/50 font-medium text-white">運算能力 (Power)</td>
                  <td className="p-4 border-b border-zinc-800/50 text-zinc-400">受限於手機 NPU</td>
                  <td className="p-4 border-b border-zinc-800/50 text-indigo-300">強大的多模態與推理能力</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-lg mt-4">
            <strong className="text-indigo-400">策略：</strong> 邊緣端負責過濾 90% 的正常流量與即時防護；當遇到高難度樣本或需要深度語意分析（如釣魚簡訊）時，才去識別化後送交雲端 Gemini 模型處理。
          </div>
        </div>
      )
    },
    {
      title: "OWASP API 安全與防禦",
      subtitle: "如何保護後端免受攻擊？",
      icon: <Lock className="w-12 h-12 text-rose-500" />,
      notes: "身為一個資安產品，我們自身的後端 API 絕對不能成為駭客的突破口。\n\n在雲端分析的 API 設計上，我們嚴格遵循 OWASP 安全規範：\n第一，我們實作了嚴格的輸入驗證與速率限制，防止資源耗盡攻擊 (DoS)。\n第二，我們捨棄使用者上傳的檔名，改用系統生成的 UUID，徹底杜絕路徑遍歷攻擊。\n最後，我們堅持『無狀態分析』與『零機敏日誌』，確保使用者的檔案分析完即刻銷毀，日誌中也絕對找不到任何個人識別資訊 (PII)。",
      content: (
        <div className="space-y-6 text-zinc-300">
          <p className="text-lg">在開發雲端分析 API (FastAPI) 時，我們實作了以下關鍵的 OWASP 安全防禦機制：</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm">1</span>
                嚴格輸入驗證與限流
              </h4>
              <p className="text-sm text-zinc-400">
                限制檔案格式 (僅 MP4) 與大小 (50MB)。實作 Rate Limiting (如 5次/分鐘)，防範資源耗盡 (DoS) 攻擊。
              </p>
            </div>
            <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm">2</span>
                防止路徑遍歷 (Path Traversal)
              </h4>
              <p className="text-sm text-zinc-400">
                捨棄使用者提供的原始檔名，改用伺服器生成的 UUID 儲存檔案，並使用 `os.path.abspath` 雙重檢查儲存路徑。
              </p>
            </div>
            <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm">3</span>
                隱私日誌 (Zero-PII Logging)
              </h4>
              <p className="text-sm text-zinc-400">
                系統日誌僅記錄 UUID 與錯誤代碼，絕不記錄使用者的真實 IP、姓名或原始檔名，符合嚴格的隱私法規。
              </p>
            </div>
            <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm">4</span>
                無狀態分析 (Stateless)
              </h4>
              <p className="text-sm text-zinc-400">
                雲端伺服器僅在記憶體中進行推論，分析完成後立即銷毀敏感資料，不落盤儲存 (Zero-log policy)。
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "LLM Prompt Injection 防禦",
      subtitle: "保護 AI 不被惡意指令劫持",
      icon: <Zap className="w-12 h-12 text-amber-500" />,
      notes: "最後，導入 LLM 最怕的就是『提示詞注入攻擊 (Prompt Injection)』，也就是駭客用惡意指令覆寫我們的 AI 系統。\n\n為此，我們設計了三層防禦：\n首先是『資料清洗』，在後端強制剝離危險字元；\n接著使用『XML 定界符』將使用者的輸入牢牢關在標籤裡；\n最後採用『參數化提示詞』，將系統指令與使用者資料徹底隔離。\n\n大家稍後可以在我們的『日誌與威脅分析』功能中，實際測試這個防禦機制的威力。以上是 TrueSight 的核心架構報告，謝謝大家。",
      content: (
        <div className="space-y-6 text-zinc-300">
          <p className="text-lg">
            當允許使用者輸入文字（如日誌或簡訊）供 AI 分析時，攻擊者可能使用「提示詞注入 (Prompt Injection)」來覆寫 AI 的指令。
          </p>
          
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mt-6">
            <h4 className="text-amber-400 font-bold mb-4">我們的防禦策略：定界符與沙箱封裝</h4>
            <div className="space-y-4">
              <div className="pl-4 border-l-2 border-zinc-700">
                <strong className="text-white block mb-1">1. 資料清洗 (Sanitization)</strong>
                <p className="text-sm text-zinc-400">在後端程式碼中，強制移除使用者輸入中所有可能與定界符衝突的字元（如 &lt;log&gt; 標籤），防止「定界符逃逸」。</p>
              </div>
              <div className="pl-4 border-l-2 border-zinc-700">
                <strong className="text-white block mb-1">2. 明確的定界符 (Delimiters)</strong>
                <p className="text-sm text-zinc-400">使用 XML 標籤將不可信的使用者輸入包裹起來，並在系統提示詞中嚴格警告 AI 該區塊僅為純文字資料。</p>
              </div>
              <div className="pl-4 border-l-2 border-zinc-700">
                <strong className="text-white block mb-1">3. 參數化提示詞 (Parameterized Prompts)</strong>
                <p className="text-sm text-zinc-400">將系統指令 (System Instruction) 與使用者輸入 (Contents) 徹底分離，絕不將使用者輸入拼接到系統指令中。</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500 mt-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            您可以在「日誌與威脅分析」功能中，載入「Prompt Injection 攻擊」測試資料來驗證此防禦機制的有效性。
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">專案報告模式 (Presentation)</h2>
          <p className="text-zinc-400 mt-1">使用此模式向主管或客戶簡報 TrueSight 的核心架構與安全設計。</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
              showNotes 
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-200"
            )}
          >
            <MessageSquareText className="w-4 h-4" />
            {showNotes ? '隱藏講稿' : '顯示講稿'}
          </button>
          <div className="text-sm font-medium text-zinc-500">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Slide Area */}
        <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 flex flex-col relative overflow-hidden transition-all duration-300">
          {/* Background Accent */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-start gap-6 mb-8 relative z-10">
            <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-xl">
              {slides[currentSlide].icon}
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                {slides[currentSlide].title}
              </h3>
              <p className="text-xl text-indigo-400 font-medium">
                {slides[currentSlide].subtitle}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 relative z-10">
            {slides[currentSlide].content}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between relative z-10">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
              上一頁
            </button>
            
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    currentSlide === idx ? "bg-indigo-500 w-8" : "bg-zinc-700 hover:bg-zinc-500"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-indigo-600 text-white hover:bg-indigo-500"
            >
              {currentSlide === slides.length - 1 ? '結束報告' : '下一頁'}
              {currentSlide !== slides.length - 1 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Speaker Notes Panel */}
        {showNotes && (
          <div className="w-80 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-amber-500/10">
              <h3 className="text-lg font-bold text-amber-500 flex items-center gap-2">
                <MessageSquareText className="w-5 h-5" />
                講者備忘稿
              </h3>
              <button 
                onClick={() => setShowNotes(false)}
                className="text-amber-500/50 hover:text-amber-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-sm">
                {slides[currentSlide].notes}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
