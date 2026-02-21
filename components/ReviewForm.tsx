import React, { useState } from 'react';
import { StarRating } from './StarRating';

interface ReviewFormProps {
  conversationId: string;
  onSubmitSuccess: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ conversationId, onSubmitSuccess }) => {
  const [ratings, setRatings] = useState({
    overall: 0,
    aiQuality: null as number | null,
    difficulty: null as number | null,
  });
  const [feedback, setFeedback] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (ratings.overall === 0) {
      setError('Please provide an overall rating.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to POST /api/reviews
      // In a real implementation this would fetch from an actual endpoint:
      // await fetch('/api/reviews', { method: 'POST', body: JSON.stringify({...}) });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate success
      setIsSuccess(true);
      onSubmitSuccess();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-900/80 border border-white/10 rounded-xl p-8 text-center backdrop-blur-lg">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
        <p className="text-slate-400">Your feedback has been successfully submitted and helps us improve the experience.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-xl p-6 backdrop-blur-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6">Review your Interview</h3>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Overall Experience (Required) */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-300">
            Overall Experience <span className="text-emerald-400">*</span>
          </label>
          <StarRating 
            value={ratings.overall} 
            onChange={(val) => setRatings(prev => ({ ...prev, overall: val }))} 
            size="lg" 
          />
        </div>

        {/* AI Quality (Optional) */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-300">
            AI Interviewer Quality <span className="text-slate-500 text-xs font-normal ml-2">(Optional)</span>
          </label>
          <div className="flex items-center gap-4">
            <StarRating 
              value={ratings.aiQuality || 0} 
              onChange={(val) => setRatings(prev => ({ ...prev, aiQuality: val }))} 
            />
            {ratings.aiQuality !== null && (
              <button 
                type="button" 
                onClick={() => setRatings(prev => ({ ...prev, aiQuality: null }))}
                className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Difficulty (Optional) */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-300">
            Interview Difficulty <span className="text-slate-500 text-xs font-normal ml-2">(Optional)</span>
          </label>
          <div className="flex items-center gap-4">
             <StarRating 
              value={ratings.difficulty || 0} 
              onChange={(val) => setRatings(prev => ({ ...prev, difficulty: val }))} 
            />
             {ratings.difficulty !== null && (
              <button 
                type="button" 
                onClick={() => setRatings(prev => ({ ...prev, difficulty: null }))}
                className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Free-text feedback */}
        <div className="space-y-3">
          <label htmlFor="feedback" className="block text-sm font-medium text-slate-300">
            Additional Feedback <span className="text-slate-500 text-xs font-normal ml-2">(Optional)</span>
          </label>
          <textarea
            id="feedback"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
            placeholder="What did you like? What could be improved?"
          />
        </div>

        {/* Would Recommend Toggle */}
        <div className="flex items-center space-x-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={wouldRecommend}
              onChange={(e) => setWouldRecommend(e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 border border-white/5"></div>
            <span className="ml-3 text-sm font-medium text-slate-300">I would recommend CleverMock to a friend</span>
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p>{error}</p>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-3 px-6 rounded-lg font-bold text-white transition-all
              ${isSubmitting 
                ? 'bg-slate-800 cursor-not-allowed text-slate-400' 
                : 'bg-linear-to-r from-blue-600 to-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-95'
              }
              flex items-center justify-center gap-2
            `}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Feedback...
              </>
            ) : (
              'Submit Review'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
