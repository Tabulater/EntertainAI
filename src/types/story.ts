export interface StoryNode {
  id: string;
  title: string;
  content: string;
  image?: string;
  imageType?: 'upload' | 'url';
  backgroundMusic?: string;
  musicType?: 'upload' | 'url';
  enableTTS?: boolean;
  choices: Choice[];
  position?: { x: number; y: number };
}

export interface Choice {
  id: string;
  text: string;
  targetNodeId: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  startNodeId: string;
  nodes: Record<string, StoryNode>;
}

export interface StoryProject {
  story: Story;
  metadata: {
    version: string;
    nodeCount: number;
    lastEditedNode?: string;
  };
}