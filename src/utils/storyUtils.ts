import { StoryNode, Story, Choice } from '../types/story';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function createEmptyStory(title: string, author: string): Story {
  const startNodeId = generateId();
  const now = new Date().toISOString();
  
  return {
    id: generateId(),
    title,
    description: '',
    author,
    createdAt: now,
    updatedAt: now,
    startNodeId,
    nodes: {
      [startNodeId]: createEmptyNode('Story Beginning', 'Welcome to your adventure! What happens next is up to you.')
    }
  };
}

export function createEmptyNode(title: string = 'New Chapter', content: string = ''): StoryNode {
  return {
    id: generateId(),
    title,
    content,
    choices: [],
    enableTTS: false,
    position: { x: 0, y: 0 }
  };
}

export function createChoice(text: string, targetNodeId: string): Choice {
  return {
    id: generateId(),
    text,
    targetNodeId
  };
}

export function validateStory(story: Story): string[] {
  const errors: string[] = [];
  
  if (!story.title.trim()) {
    errors.push('Story title is required');
  }
  
  if (!story.startNodeId || !story.nodes[story.startNodeId]) {
    errors.push('Story must have a valid starting chapter');
  }
  
  // Check for orphaned nodes
  const reachableNodes = new Set<string>();
  const queue = [story.startNodeId];
  
  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (reachableNodes.has(nodeId)) continue;
    
    reachableNodes.add(nodeId);
    const node = story.nodes[nodeId];
    
    if (node) {
      node.choices.forEach(choice => {
        if (story.nodes[choice.targetNodeId]) {
          queue.push(choice.targetNodeId);
        }
      });
    }
  }
  
  const orphanedNodes = Object.keys(story.nodes).filter(id => !reachableNodes.has(id));
  if (orphanedNodes.length > 0) {
    errors.push(`Found ${orphanedNodes.length} unreachable chapter(s)`);
  }
  
  return errors;
}

export function getStoryStats(story: Story) {
  const nodeCount = Object.keys(story.nodes).length;
  const choiceCount = Object.values(story.nodes).reduce((total, node) => total + node.choices.length, 0);
  const endingCount = Object.values(story.nodes).filter(node => node.choices.length === 0).length;
  
  return { nodeCount, choiceCount, endingCount };
}