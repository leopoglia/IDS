import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation
} from "emoji-picker-react";
import { useState } from "react";
import "./style.css"

export default function App() {
    const [selectedEmoji, setSelectedEmoji] = useState<string>("");

    function onClick(emojiData: EmojiClickData, event: MouseEvent) {
        setSelectedEmoji(emojiData.unified);
    }

    return (
        <div className="Emoji">
            <EmojiPicker
                onEmojiClick={onClick}
                autoFocusSearch={false} />
        </div>
    );
}
