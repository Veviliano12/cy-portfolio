import React from 'react';
import { BarChart3, PieChart, ArrowRight } from 'lucide-react';

const PPTView = () => {
  return (
     <div className="aspect-video h-full w-auto max-w-full flex flex-col p-10 bg-gradient-to-br from-gray-50 to-gray-200 relative pt-16 animate-in fade-in zoom-in-95 duration-500 shadow-2xl overflow-hidden rounded-md"> 
          
          <div className="flex justify-between items-end border-b-2 border-gray-300 pb-4 mb-6 shrink-0">
             <div className="flex flex-col gap-2">
                <span className="text-gray-500 text-xl font-medium tracking-wide uppercase">Quarterly Review</span>
                <h1 className="text-6xl font-bold text-gray-800">Q3 业务增长汇报</h1>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                <span className="text-gray-600 font-bold">SmartCorp Inc.</span>
             </div>
          </div>


          <div className="flex flex-1 gap-12 min-h-0">
             <div className="w-1/3 flex flex-col gap-6 overflow-y-auto pr-2">
                <div className="flex flex-col gap-2">
                   <h2 className="text-3xl font-bold text-blue-700">核心指标概览</h2>
                   <p className="text-gray-600 text-lg leading-relaxed">
                      本季度我们在用户增长和市场渗透率方面取得了显著突破。核心产品线的活跃用户数（DAU）同比增长 45%。
                   </p>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600"><BarChart3 size={24} /></div>
                      <div>
                         <div className="text-xl font-bold text-gray-800">¥ 42.5M</div>
                         <div className="text-xs text-gray-500">总营收 (Revenue)</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"><PieChart size={24} /></div>
                      <div>
                         <div className="text-xl font-bold text-gray-800">18.2%</div>
                         <div className="text-xs text-gray-500">净利润率 (Margin)</div>
                      </div>
                   </div>
                </div>
             </div>


             <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                <h3 className="text-xl font-bold text-gray-700 mb-6">增长趋势预测</h3>
                <div className="flex-1 flex items-end justify-between px-8 pb-4 gap-4">
                   {[40, 55, 45, 70, 65, 85, 90].map((h, i) => (
                      <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group hover:bg-blue-200 transition-colors" style={{ height: `${h}%` }}>
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 font-bold">{h}%</div>
                      </div>
                   ))}
                </div>
                <div className="h-px bg-gray-300 w-full"></div>
                <div className="flex justify-between text-gray-400 text-sm mt-2 px-2">
                   <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                </div>
             </div>
          </div>


          <div className="mt-8 flex justify-between items-center text-gray-400 text-xs md:text-sm shrink-0">
             <span>Confidential - Internal Use Only</span>
             <div className="flex items-center gap-2">
                <span>Page 04 / 28</span>
                <ArrowRight size={16} />
             </div>
          </div>
       </div>
  );
};

export default PPTView;
