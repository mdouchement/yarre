module App
  class RegexProcessor
    attr_accessor :regex, :input

    def initialize(pattern, input)
      @regex = Regexp.new pattern
      @input = input
    end

    def process
      m = input.match(regex)
      {
        match_result: m.to_s,
        match_groups: m.captures,
        group_names: m.names
      }
    end
  end
end
