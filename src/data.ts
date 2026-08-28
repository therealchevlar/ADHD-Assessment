import type { Assessment, Rating, Symptom, YesNoUnsure } from './types';

type Question = { title: string; explanation: string };

export const inattention: Question[] = [
  { title: 'Misses details or makes avoidable mistakes', explanation: 'For example, overlooking instructions, skipping details, or making mistakes that could have been avoided with more careful attention.' },
  { title: 'Has trouble sustaining attention', explanation: 'Finding it difficult to keep your mind on a task, conversation, reading, or activity for a reasonable amount of time.' },
  { title: 'Seems not to listen when directly addressed', explanation: 'For example, someone speaks to you directly but you later realise you did not take in what they said, even when you were not deliberately ignoring them.' },
  { title: 'Does not follow through or finish tasks', explanation: 'Starting something but losing track of it, leaving tasks unfinished, or failing to complete the final steps even when you intended to.' },
  { title: 'Finds organising tasks difficult', explanation: 'Difficulty planning, sequencing, keeping materials in order, managing several steps, or knowing what needs to be done first.' },
  { title: 'Avoids tasks requiring sustained mental effort', explanation: 'Putting off or avoiding activities that require prolonged concentration, such as studying, reading, paperwork, or lengthy assignments.' },
  { title: 'Loses things needed for tasks', explanation: 'Frequently misplacing things you need, such as keys, phone, books, school materials, documents, or other everyday items.' },
  { title: 'Is easily distracted by outside stimuli', explanation: 'Your attention is pulled away by sounds, movement, notifications, people, your surroundings, or unrelated thoughts.' },
  { title: 'Is forgetful in daily activities', explanation: 'Forgetting everyday responsibilities, appointments, messages, chores, deadlines, or things you intended to do.' },
];

export const hyperactivity: Question[] = [
  { title: 'Fidgets, taps, or squirms', explanation: 'Frequently moving your hands, feet, body, or objects when you are expected to stay relatively still.' },
  { title: 'Leaves a seat when expected to stay seated', explanation: 'Getting up or moving away from your seat in situations where remaining seated is normally expected.' },
  { title: 'Feels physically restless', explanation: 'Feeling an internal need to move, pace, shift position, or do something active rather than comfortably staying still.' },
  { title: 'Finds quiet leisure difficult', explanation: 'Having trouble doing calm activities quietly, such as reading, relaxing, watching something, or doing a quiet hobby.' },
  { title: 'Feels driven by a motor', explanation: 'Feeling unusually active or as though you have difficulty slowing down, especially when compared with what the situation calls for.' },
  { title: 'Talks more than intended', explanation: 'Talking frequently or for longer than is appropriate for the situation, sometimes without noticing how much you are speaking.' },
  { title: 'Blurts out before a question is complete', explanation: 'Answering before someone finishes speaking, finishing their sentence, or saying what you are thinking before it is your turn.' },
  { title: 'Finds waiting a turn difficult', explanation: 'Becoming impatient or struggling to wait in conversations, queues, games, or other situations where taking turns is expected.' },
  { title: 'Interrupts or intrudes on others', explanation: 'Joining conversations, activities, or tasks without waiting, or taking over other people’s interactions or activities.' },
];

export const settings = ['Home & routines', 'School / university', 'Workplace', 'Relationships & social life', 'Personal responsibilities'];
export const impairment = ['Academic / study performance', 'Work performance', 'Relationships', 'Household responsibilities', 'Time management', 'Financial management', 'Driving / safety', 'Daily self-management'];
export const executive = ['Task initiation', 'Planning', 'Working memory', 'Time management', 'Prioritisation', 'Task switching', 'Inhibition', 'Organisation', 'Sustained effort', 'Delayed gratification'];
export const differential = [
  { title: 'Poor or irregular sleep', explanation: 'Sleep deprivation or an inconsistent sleep schedule can affect attention, energy, memory, and concentration.' },
  { title: 'Low mood, low energy, or loss of interest', explanation: 'Mood changes can affect concentration, motivation, memory, and activity levels.' },
  { title: 'Anxiety, worry, or racing thoughts', explanation: 'Persistent worry or racing thoughts can make it difficult to focus on what is happening in front of you.' },
  { title: 'Major life stress', explanation: 'Significant stress can temporarily or persistently affect attention, sleep, memory, and emotional regulation.' },
  { title: 'Alcohol, cannabis, stimulants, or other substances', explanation: 'Substances can affect attention, sleep, activity, memory, and behaviour, including during intoxication or withdrawal.' },
  { title: 'Excess caffeine', explanation: 'High caffeine intake can affect sleep, restlessness, anxiety, and concentration.' },
  { title: 'Learning or processing difficulties', explanation: 'Learning or processing differences can make particular academic or work tasks harder without necessarily indicating ADHD.' },
  { title: 'Trauma / stress-related symptoms', explanation: 'Trauma and ongoing stress can affect concentration, alertness, memory, sleep, and emotional responses.' },
  { title: 'Medical, neurological, or medication factors', explanation: 'Some health conditions and medications can influence attention, energy, sleep, or activity levels.' },
];
export const childhood = ['Attention / focus', 'Homework completion', 'Forgetfulness', 'Losing school supplies', 'Daydreaming', 'Following instructions', 'Restlessness', 'Talking excessively', 'Interrupting', 'Impulsivity', 'Organisation', 'Academic inconsistency', 'Behavioural difficulties'];

const indexed = (a: number[]) => Object.fromEntries(a.map((x, i) => [i, x as Rating]));
const symptoms = (items: Question[], ratings: number[], example = ''): Symptom[] => items.map((_, i) => ({ rating: (ratings[i] ?? 0) as Rating, example: i === 1 ? example : '' }));

export const createAssessment = (): Assessment => ({
  user: { name: '', age: '', dob: '', role: '', education: '', country: '', date: new Date().toISOString().slice(0, 10) },
  inattentive: symptoms(inattention, Array(9).fill(0)),
  hyperactive: symptoms(hyperactivity, Array(9).fill(0)),
  duration: '', childhood: {}, childNotes: '', settings: {}, impairment: {}, executive: {}, differential: {}, collateral: { type: '', note: '' },
});

export const demoAssessment = (): Assessment => ({
  ...createAssessment(),
  user: { name: 'Alex Morgan — fictional case', age: '23', dob: '', role: 'University student', education: 'Undergraduate', country: 'Example country', date: new Date().toISOString().slice(0, 10) },
  inattentive: symptoms(inattention, [3,3,3,3,3,3,3,3,2], 'Loses focus during long study sessions and needs frequent redirection.'),
  hyperactive: symptoms(hyperactivity, [3,3,3,1,1,2,2,2,2]),
  duration: 'Since childhood',
  childhood: Object.fromEntries(childhood.map((_, i) => [i, (i < 8 ? 'Yes' : 'Unsure') as YesNoUnsure])),
  childNotes: 'Fictional school reports noted missed assignments and daydreaming.',
  settings: indexed([3,4,2,2,3]), impairment: indexed([3,2,2,3,4,2,1,3]),
  executive: indexed([4,3,3,4,3,3,2,3,3,2]), differential: indexed([2,1,2,3,0,2,1,0,0]),
  collateral: { type: 'Parent', note: 'Fictional observer describes longstanding organisation difficulties.' },
});
