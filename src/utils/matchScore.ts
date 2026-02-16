import type { Job } from '../types/Job';
import type { UserPreferences } from '../types/UserPreferences';

export const calculateMatchScore = (job: Job, preferences: UserPreferences | null): number => {
    if (!preferences) return 0;

    let score = 0;

    // +25 if any roleKeyword appears in job.title (case-insensitive)
    if (preferences.roleKeywords.length > 0) {
        const titleLower = job.title.toLowerCase();
        const hasKeywordInTitle = preferences.roleKeywords.some(keyword =>
            titleLower.includes(keyword.toLowerCase())
        );
        if (hasKeywordInTitle) score += 25;
    }

    // +15 if any roleKeyword appears in job.description
    if (preferences.roleKeywords.length > 0) {
        const descLower = job.description.toLowerCase();
        const hasKeywordInDesc = preferences.roleKeywords.some(keyword =>
            descLower.includes(keyword.toLowerCase())
        );
        if (hasKeywordInDesc) score += 15;
    }

    // +15 if job.location matches preferredLocations
    if (preferences.preferredLocations.length > 0) {
        const locationMatch = preferences.preferredLocations.some(loc =>
            job.location.toLowerCase().includes(loc.toLowerCase())
        );
        if (locationMatch) score += 15;
    }

    // +10 if job.mode matches preferredMode
    if (preferences.preferredMode.length > 0) {
        if (preferences.preferredMode.includes(job.mode)) score += 10;
    }

    // +10 if job.experience matches experienceLevel
    if (preferences.experienceLevel && job.experience === preferences.experienceLevel) {
        score += 10;
    }

    // +15 if overlap between job.skills and user.skills (any match)
    if (preferences.skills.length > 0) {
        const hasSkillMatch = preferences.skills.some(userSkill =>
            job.skills.some(jobSkill =>
                jobSkill.toLowerCase() === userSkill.toLowerCase()
            )
        );
        if (hasSkillMatch) score += 15;
    }

    // +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) score += 5;

    // +5 if source is LinkedIn
    if (job.source === 'LinkedIn') score += 5;

    // Cap score at 100
    return Math.min(score, 100);
};

export const getMatchScoreColor = (score: number): 'success' | 'warning' | 'neutral' | 'error' => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    if (score >= 40) return 'neutral';
    return 'error';
};

export const getMatchScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Poor Match';
};
