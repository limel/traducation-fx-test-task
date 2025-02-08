export interface StoryProps {
  history: StoryItem[] | []
}
export interface StoryItem {
  action: string
  timestamp: number
}
