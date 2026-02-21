import React, { useState, useEffect } from 'react';
import { StarRating } from './StarRating';
import { submitReview, getReview, ReviewCreate, ReviewResponse } from '@/lib/api';

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
  const [initialLoading, setInitialLoading] = useState(true);
  const [existingReview, setExistingReview] = useState<ReviewResponse | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const review = await getReview(conversationId);
        if (review) {
          setExistingReview(review);
          setIsSuccess(true);
        }
      } catch (err) {
        console.error("Failed to fetch existing review:", err);
        // We don't necessarily want to block rendering the form if the fetch fails,
        // but it's good to log it.
      } finally {
        setInitialLoading(false);
      }
    };
    
    if (conversationId) {
      fetchReview();
    } else {
      setInitialLoading(false);
    }
  }, [conversationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (ratings.overall === 0) {
      setError('Please provide an overall rating.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ReviewCreate = {
        overall_rating: ratings.overall,
        ...(ratings.aiQuality !== null && { ai_quality_rating: ratings.aiQuality }),
        ...(ratings.difficulty !== null && { difficulty_rating: ratings.difficulty }),
        ...(feedback.trim() && { feedback_text: feedback.trim() }),
        would_recommend: wouldRecommend,
      };

      const reviewResponse = await submitReview(conversationId, payload);
      setExistingReview(reviewResponse);
      setIsSuccess(true);
      onSubmitSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="bg-slate-900/80 border border-white/10 rounded-xl p-8 flex justify-center items-center min-h-[200px] backdrop-blur-lg">
        <svg className="animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (isSuccess || existingReview) {
    return (
      <div className="bg-slate-900/80 border border-white/10 rounded-xl p-8 text-center backdrop-blur-lg max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
        <p className="text-slate-400 mb-8">Your feedback has been successfully submitted and helps us improve the experience.</p>

        {existingReview && (
          <div className="bg-slate-950/50 rounded-lg p-6 border border-white/5 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <span className="text-sm font-medium text-slate-300">Overall Experience</span>
               <StarRating value={existingReview.overall_rating} size="sm" readonly />
            </div>
            
            {(existingReview.ai_quality_rating ?? null) !== null && (
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                 <span className="text-sm font-medium text-slate-300">AI Quality</span>
                 <StarRating value={existingReview.ai_quality_rating!} size="sm" readonly />
              </div>
            )}
            
             {(existingReview.difficulty_rating ?? null) !== null && (
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                 <span className="text-sm font-medium text-slate-300">Difficulty</span>
                 <StarRating value={existingReview.difficulty_rating!} size="sm" readonly />
              </div>
            )}

            {existingReview.feedback_text && (
              <div className="space-y-2 border-b border-white/10 pb-4">
                <span className="text-sm font-medium text-slate-300">Feedback</span>
                <p className="text-slate-400 text-sm italic">&quot;{existingReview.feedback_text}&quot;</p>
              </div>
            )}

             <div className="flex items-center justify-between">
                 <span className="text-sm font-medium text-slate-300">Would Recommend</span>
                 <span className="text-sm font-medium text-white bg-slate-800 px-3 py-1 rounded-full border border-white/10">
                    {existingReview.would_recommend ? 'Yes' : 'No'}
                 </span>
             </div>
          </div>
        )}
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
