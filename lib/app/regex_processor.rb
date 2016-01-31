module App
  class RegexProcessor
    attr_accessor :regex, :content

    # TODO support modifier
    def initialize(pattern, content, modifiers)
      modifiers = modifiers.split('').map do |m|
        case m
        when 'i'
          Regexp::IGNORECASE
        when 'x'
          Regexp::EXTENDED
        when 'm'
          Regexp::MULTILINE
        when 'n'
          Regexp::NOENCODING
        else
          nil
        end
      end

      @regex = Regexp.new(pattern, modifiers.compact.reduce(:|))
      @content = content
    end

    def process
      if (m = content.match(regex))
        {
          match_result: m.to_s,
          match_groups: m.captures,
          group_names: m.names
        }
      else
        {
          match_result: '',
          match_groups: [],
          group_names: []
        }
      end
    end
  end
end
